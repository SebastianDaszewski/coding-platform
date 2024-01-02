type DashboardHeaderProps = {
  title: string;
};

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title }) => {
  return (
    <div className="flex justify-center items-center">
      <h1>{title}</h1>
    </div>
  );
};

export default DashboardHeader;
