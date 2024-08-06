import PublicLayout from '@/components/PublicLayout'
import { UserProfile } from '@clerk/nextjs'

const UserProfilePage = () => (
  <div className="mx-auto mt-20 w-fit">
    <UserProfile path="/dashboard/user-profile" />
  </div>
)

export default UserProfilePage
