'use client'


export default function DashboardLayout({ children,analytics,team}) {
  return (
    <div className="bg-[#CECEE4] ">
      <div className="text-center text-gray-600 font-medium antialiased p-4 text-4xl  uppercase">Dashboard</div>
      {children}
      {analytics}
      {team}
    </div>
  );
}