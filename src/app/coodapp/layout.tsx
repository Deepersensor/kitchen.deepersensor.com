import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coodapp - DeeperSensor Kitchen",
  description: "Create web applications directly from natural language prompts",
};

export default function CoodappLayout({
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
