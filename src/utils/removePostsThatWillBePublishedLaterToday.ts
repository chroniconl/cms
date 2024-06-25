import { format } from "date-fns";
import { getPSTDate } from "./dates";

export const removePostsThatWillBePublishedLaterToday = (posts: any[]) => {
  const pstDate = getPSTDate();
  const formattedPSTDate = format(pstDate, "yyyy-MM-dd");
  const formattedPSTTime = format(pstDate, "HH:mm:ss");

  return posts.filter((post) => {
    const postDate = post?.publish_date_day;
    const postTime = post?.publish_date_time;

    if (!postDate || !postTime) {
      return false;
    }

    if (postDate === formattedPSTDate && postTime > formattedPSTTime) {
      return false;
    }
    return true;
  });
};
