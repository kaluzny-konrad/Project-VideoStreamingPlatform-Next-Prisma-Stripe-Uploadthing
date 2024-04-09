type Props = {
  text: string;
};

export default function TextHeader({ text }: Props) {
  return (
    <div className="flex items-center mb-4">
      <h1 className="text-2xl font-bold text-slate-800">{text}</h1>
    </div>
  );
}
