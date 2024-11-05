

interface FeatureProps  {
    id?: number;
    description?: string
    name?: string;
    imageUrl?: string;
    height?: any;
    count?: any;
}

export default function FeatureCard({ imageUrl, name, description }: FeatureProps) {
  return (
    <div className="flex flex-col transition-all h-full rounded-lg overflow-hidden group/item cursor-pointer">
      <img className={`group-hover/item:border transition-all group-hover/item:border-brown-100 w-30 h-60 object-cover`} src={imageUrl} />
      <div className="flex flex-col h-full items-center px-1 pt-5 pb-6 rounded-lg rounded-t-none border border-t-0 border-neutral-300 group-hover/item:border-brown-100 group-hover/item:bg-main-100">
        <div className="font-medium text-green-1000 text-base md:text-lg  group-hover/item:text-brown-100">{name}</div>
        <div className="flex items-center text-neutral-700">
        </div>
        <span className="container text-neutral-700 group-hover/item:text-brown-100 font-normal text-sm">{`${description}`}</span>
      </div>
    </div>
  );
}
