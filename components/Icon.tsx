import {
  AdminIcon,
  CalendarIcon,
  DashboardIcon,
  LessonsIcon,
  RankingIcon,
  SettingsIcon,
  JsTasksListIcon,
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
    case "RankingIcon":
      return <RankingIcon fill={fill} />;
    case "SettingsIcon":
      return <SettingsIcon fill={fill} />;
    case "JsTasksListIcon":
      return <JsTasksListIcon fill={fill} />;
    default:
      return null;
  }
};
export default Icon;
