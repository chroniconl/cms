import PublicLayout from '@/components/general/PublicLayout'
import { UserProfile } from '@clerk/nextjs'

const UserProfilePage = () => (
  <PublicLayout>
    <div className="mx-auto mt-20 w-fit">
      <UserProfile path="/user-profile" />
    </div>
  </PublicLayout>
)

export default UserProfilePage
