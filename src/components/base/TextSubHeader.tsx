type Props = {
    text: string
}

export default function TextSubHeader({
    text
}: Props) {
  return (
    <h2 className="mb-6 text-lg font-bold text-slate-800">
      {text}
    </h2>
  )
}