import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { Time } from "@/components/general/Time";
import { Text } from "@/components/ui/text";
import TipTap from "@/components/general/TipTap";
import { formatTimestampToSlug } from "@/utils/formatTimestampToSlug";
import { ClientImage } from "@/components/ui/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PostProps {
  title: string;
  description: string;
  content: string;
  date: string;
  slug: string;
  tags: string;
  category: {
    id: string;
    name: string;
    color: string;
    slug: string;
  };
  imageUrl: string | null;
  imageAlt: string | null;
  author: {
    id: string;
    display_name: string;
    href: string;
    avatar_url: string;
    twitter_handle: string;
  };
}
export default function Post({
  title,
  description,
  content,
  date,
  slug,
  tags,
  category,
  imageUrl,
  imageAlt,
  author,
}: PostProps) {
  return (
    <article>
      <ClientImage src={imageUrl} alt={imageAlt} />
      <div className="mt-4 flex flex-col justify-between group-hover:opacity-75">
        <div>
          <Heading>{title}</Heading>
          <Text className="mt-2">{description}</Text>
        </div>
        <div className="mt-6 flex items-center text-sm space-x-2.5">
          <Time date={date} />
          <Badge color={category?.color}>{category?.name}</Badge>
        </div>
        <div className="mt-3 flex items-center text-sm space-x-2.5">
          <Avatar>
            <AvatarImage src={author?.avatar_url} alt={author?.display_name} />
            <AvatarFallback className="w-full h-full">
              {/* placeholder image */}
              <img
                src="https://utfs.io/f/d4271cec-49ca-475a-ab84-df354ce7e35a-h5faa7.png"
                alt="Avatar"
              />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{author?.display_name}</span>
            <span className="text-xs text-muted-foreground">
              @{author?.twitter_handle}
            </span>
          </div>
        </div>
      </div>
      <div className="border-t dark:border-stone-600 mt-12 pt-8 flex flex-col justify-between">
        <TipTap
          defaultValue={content}
          editable={false}
          className="prose dark:prose-invert prose-li:py-1 prose:w-full prose-p:0.5 prose-stone prose-lg max-w-full"
        />
      </div>
    </article>
  );
}

export const PostCardDefaultSize = ({
  title,
  description,
  date,
  slug,
  tags,
  category,
  publish_date_day,
  publish_date_date,
  imageUrl,
  imageAlt,
}: {
  title: string;
  description: string;
  date: string;
  slug: string;
  tags: string;
  category: {
    name: string;
    color: string;
  };
  publish_date_day: string;
  publish_date_date: string;
  imageUrl: string | null;
  imageAlt: string | null;
}) => {
  return (
    <Link href={`/blog/${formatTimestampToSlug(publish_date_day)}/${slug}`}>
      <article className="group">
        <ClientImage src={imageUrl} alt={imageAlt} />
        <div className="mt-4 flex flex-col justify-between">
          <div>
            <Heading className="text-base font-bold text-stone-900">
              {title}
            </Heading>
            <Text className="mt-2 text-sm text-stone-500 line-clamp-2" small>
              {description.slice(0, 200)}
            </Text>
          </div>
          <div className="mt-3 flex items-center text-sm">
            <Badge color={category.color}>{category.name}</Badge>
          </div>
        </div>
      </article>
    </Link>
  );
};
