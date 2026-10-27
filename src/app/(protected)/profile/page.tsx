import Container from "@/components/general/layouts/Container";
import ProfileCard from "../../../components/profile/ProfileCard";
import { getCurrentUserProfile } from "@/server-actions/getCurrentUserProfile";
import { Suspense } from "react";
import ProfileModal from "@/components/modal/ProfileModal";
import { getCurrentUser } from "@/server-actions/getCurrentUser";

async function ProfileComponent() {
  const userProfile = await getCurrentUserProfile();
  const currentUser = await getCurrentUser();
  return (
    <>
      {userProfile && (
        <ProfileCard
          userProfile={userProfile}
          currentUserId={currentUser?.id || ""}
        />
      )}
      {userProfile && <ProfileModal userProfile={userProfile} />}
    </>
  );
}

export default async function ProfilePage() {
  return (
    <Container title="Profile">
      <Suspense fallback={<p className="text-white">Loading...</p>}>
        <ProfileComponent />
      </Suspense>
    </Container>
  );
}
