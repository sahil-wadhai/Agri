export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
      <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2">
        <div className="border-t-transparent border-solid animate-spin  rounded-full border-green-400 border-8 h-64 w-64"></div>
      </div>
    )
  }