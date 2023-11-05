import Link from "next/link";

const BreadCrumb = ({
  link,
  redirectTo,
  current,
}: {
  link: string;
  redirectTo: string;
  current: string;
}) => {
  return (
    <div className="h-[200px] w-full bg-slate-100">
      <div className="flex justify-center items-center h-full w-full">
        <div>
          <h2 className="text-xl font-bold">{current}</h2>
          <Link href={link} className="hover:underline transition">{redirectTo}</Link> / <span>{current}</span>
        </div>
      </div>
    </div>
  );
};

export default BreadCrumb;
