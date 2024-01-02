import { usePathname } from "next/navigation";

import {
  AdminIcon,
  CalendarIcon,
  HomeIcon,
  LessonsIcon,
  QuestIcon,
  RankingIcon,
  SettingsIcon,
} from "@/sidebarIcons";

type IconProps = { iconName: string; className?: string | undefined };

const Icon: React.FC<IconProps> = ({ iconName, className }) => {
  const isHomePage = usePathname().includes("/dashboard");
  const isRankingPage = usePathname().includes("/ranking");
  const isLessonsPage = usePathname().includes("/lessons");
  const isCalendarPage = usePathname().includes("/calendar");
  const isQuestPage = usePathname().includes("/quest");
  const isSettingsPage = usePathname().includes("/settings");
  const isAdminPage = usePathname().includes("/admin");
  switch (iconName) {
    case "AdminIcon":
      return (
        <div className={className}>
          <AdminIcon fill={isAdminPage ? "orange" : "white"} />
        </div>
      );
    case "CalendarIcon":
      return <CalendarIcon fill={isCalendarPage ? "orange" : "white"} />;
    case "HomeIcon":
      return <HomeIcon fill={isHomePage ? "orange" : "white"} />;
    case "LessonsIcon":
      return <LessonsIcon fill={isLessonsPage ? "orange" : "white"} />;
    case "QuestIcon":
      return <QuestIcon fill={isQuestPage ? "orange" : "white"} />;
    case "RankingIcon":
      return <RankingIcon fill={isRankingPage ? "orange" : "white"} />;
    case "SettingsIcon":
      return <SettingsIcon fill={isSettingsPage ? "orange" : "white"} />;
    default:
      return null;
  }
};
export default Icon;
