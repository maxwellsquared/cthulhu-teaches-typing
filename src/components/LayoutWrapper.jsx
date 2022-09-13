
const LayoutWrapper = ({ children }) => {
  return (
    <div className="mx-auto max-w-3xl flex-col justify-between px-4 sm:px-6 xl:max-w-5xl xl:px-0 ">
      <div className="font-sans">
        <main className="flex max-h-fit flex-col">{children}</main>
      </div>
    </div>
  );
};

export default LayoutWrapper;
