import Link from "next/link";

type TextLinkProps = {
  text: string;
  linkName: string;
  href: string;
};

const TextLink: React.FC<TextLinkProps> = ({ text, linkName, href }) => {
  return (
    <div className="flex items-start">
      <div className="text-sm font-medium text-white">
        {text}
        <Link href={href} className="text-blue underline">
          {linkName}
        </Link>
      </div>
    </div>
  );
};

export default TextLink;
