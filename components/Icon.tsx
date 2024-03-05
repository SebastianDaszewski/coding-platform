import {
  AdminIcon,
  CalendarIcon,
  DashboardIcon,
  LessonsIcon,
  TaskIcon,
  RankingIcon,
  SettingsIcon,
} from "@/sidebarIcons";

type IconProps = { iconName: string; fill: string };

const Icon: React.FC<IconProps> = ({ iconName, fill }) => {
  switch (iconName) {
    case "AdminIcon":
      return <AdminIcon fill={fill} />;
    case "CalendarIcon":
      return <CalendarIcon fill={fill} />;
    case "DashboardIcon":
      return <DashboardIcon fill={fill} />;
    case "LessonsIcon":
      return <LessonsIcon fill={fill} />;
    case "TaskIcon":
      return <TaskIcon fill={fill} />;
    case "RankingIcon":
      return <RankingIcon fill={fill} />;
    case "SettingsIcon":
      return <SettingsIcon fill={fill} />;
    default:
      return null;
  }
};
export default Icon;
