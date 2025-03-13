import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kitchen Chat - DeeperSensor",
  description: "Experience our experimental chat interface powered by GitHub Models",
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
