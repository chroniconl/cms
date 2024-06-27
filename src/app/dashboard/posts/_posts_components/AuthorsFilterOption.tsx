"use client";
import { useEffect } from "react";
import { create } from "zustand";
import { useForm, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

type Category = {
  id: string;
  name: string;
  slug: string;
  color: string;
};

const useCategoriesStore = create<{
  categories: any[];
  setCategories: (categories: Category[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}>((set) => ({
  categories: [],
  setCategories: (categories: Category[]) => set({ categories }),
  loading: true,
  setLoading: (loading: boolean) => set({ loading }),
}));

export default function CategoryFilterOption() {
  const { control, handleSubmit, watch, setValue, getValues } = useForm();
  const categories = useCategoriesStore((state) => state.categories);
  const setCategories = useCategoriesStore((state) => state.setCategories);
  const loading = useCategoriesStore((state) => state.loading);
  const setLoading = useCategoriesStore((state) => state.setLoading);

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      if (!isMounted) {
        return;
      }

      setLoading(true);

      const response = await fetch("/api/v0/categories");
      const { data } = await response.json();
      setCategories(data);

      setLoading(false);
    };

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  // Update query whenever the form state changes
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      // Update query here based on the form values
      const selectedCategories = categories.filter((category) =>
        getValues(`category-filter-${category.id}`),
      );
    });
    return () => subscription.unsubscribe();
  }, [watch, categories, getValues]);

  const onSubmit = () => {};

  // Watch individual checkboxes to determine the state of the "All" checkbox
  const watchCategories = watch(
    categories.map((category) => `category-filter-${category.id}`),
  );

  // Determine if "All" checkbox should be checked
  const isAllChecked =
    watchCategories.length > 0 &&
    watchCategories.every((value) => value === true);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Label htmlFor="category-filter">Filter by Category</Label>
      <div className="flex flex-col gap-2 mt-4">
        {categories && categories.length > 0 ? (
          <ScrollArea className="h-72 rounded-md border border-stone-800">
            <div className="py-4 px-2 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Controller
                  name="category-filter-all"
                  control={control}
                  defaultValue={true}
                  render={({ field }) => (
                    <Checkbox
                      id="category-filter-all"
                      checked={isAllChecked}
                      onCheckedChange={(value: boolean) => {
                        field.onChange(value);
                        categories.forEach((category: any) => {
                          setValue(`category-filter-${category.id}`, value);
                        });
                      }}
                    />
                  )}
                />
                <Label htmlFor="category-filter-all">All</Label>
              </div>
              {categories.map((category: any) => (
                <div key={category.id} className="flex items-center gap-2">
                  <Controller
                    name={`category-filter-${category.id}`}
                    control={control}
                    defaultValue={true}
                    render={({ field }) => (
                      <Checkbox
                        id={`category-filter-${category.id}`}
                        checked={field.value}
                        onCheckedChange={(value: boolean) => {
                          field.onChange(value);
                          if (value === false) {
                            setValue("category-filter-all", false);
                          }
                        }}
                      />
                    )}
                  />
                  <Label htmlFor={`category-filter-${category.id}`}>
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <>
            {!loading && (
              <div className="flex items-center gap-2">
                <Checkbox id="category-filter-none" disabled />
                <Label htmlFor="category-filter-none">None</Label>
              </div>
            )}
          </>
        )}

        {loading && (
          <div className="flex items-center gap-2">
            <Checkbox id="category-filter-loading" disabled />
            <Label htmlFor="category-filter-loading">Loading...</Label>
          </div>
        )}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
