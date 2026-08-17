import Link from "next/link";
import { Plus } from "lucide-react";
export function PageHeader({eyebrow,title,description,action}:{eyebrow:string;title:string;description?:string;action?:{href:string;label:string}}){return <header className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">{eyebrow}</p><h1 className="mt-1 text-3xl font-black tracking-tight md:text-4xl">{title}</h1>{description&&<p className="muted mt-2">{description}</p>}</div>{action&&<Link className="btn-primary" href={action.href}><Plus size={18}/>{action.label}</Link>}</header>}
