export const metadata = {
  title: "Admin Panel - Furniture Store",
  description: "Only Admin Can Access",
};

import Admin from "./Admin"; 

export default function ContactPage() {
  return (
    <div>
      <Admin />
    </div>
  );
}