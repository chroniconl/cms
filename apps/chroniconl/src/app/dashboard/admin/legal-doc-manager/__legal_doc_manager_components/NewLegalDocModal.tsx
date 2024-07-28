"use client"
import { useForm, Controller } from "react-hook-form";
import { ChButtonPrimary } from "@repo/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/dialog";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";
import { toast } from "@repo/ui/use-toast";
import { useRouter } from "next/navigation";

export function NewLegalDocModal() {
	const router = useRouter()
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (data: { title: string }) => {    
		console.log(data.title)
		const response = await fetch('/api/v0.1/legal-document-manager/create-document', {
			method: 'POST',
			body: JSON.stringify({
				title: data.title,
				slug: data.title,
			}),
		})

		const { data: responseData, error, message } = await response.json()
		if (error) {
			toast({
				title: 'Error',
				description: message,
				variant: 'destructive',
			})
			return
		}

		console.log(responseData)

		// redirect to the new document
		// router.push(`/dashboard/admin/legal-doc-manager/${responseData.slug}/edit`)
    reset(); // Reset the form after saving
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ChButtonPrimary>Create New Document</ChButtonPrimary>
      </DialogTrigger>
      <DialogContent className="p-6 sm:max-w-[425px]">
				<h2 className="ch-heading ch-primary">New Document</h2>
				<p className="ch-body ch-muted">Enter the title for the new document. Click save when you're done.</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => <Input id="title" {...field} className="col-span-3" />}
              />
            </div>
          </div>
          <DialogFooter>
            <ChButtonPrimary type="submit">Create Document</ChButtonPrimary>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}