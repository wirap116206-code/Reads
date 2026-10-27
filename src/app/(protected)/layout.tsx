import MobileMenu from "@/components/general/MobileMenu";
import Sidebar from "@/components/general/Sidebar";
import CreatePostModal from "@/components/modal/CreatePostModal";
import ReplyModal from "@/components/modal/ReplyModal";
import QueryProvider from "@/providers/QueryProvider";
import { requireAuth } from "@/server-actions/requireAuth";

export default async function ProtectedRoute({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requireAuth();
  return (
    <div className="mt-15">
      <QueryProvider>
        {children}
        <Sidebar />
        <MobileMenu />
        <CreatePostModal />
        <ReplyModal/>
      </QueryProvider>
    </div>
  );
}
