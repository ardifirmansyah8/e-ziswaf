import { Suspense } from "react";

import Profile from "@/features/Profile";

export default function Page() {
  return (
    <Suspense>
      <Profile />
    </Suspense>
  );
}
