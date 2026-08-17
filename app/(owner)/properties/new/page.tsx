import {PageHeader} from "@/components/page-header";import {PropertyForm} from "../property-form";
export default function NewProperty(){return <div className="mx-auto max-w-3xl p-5 md:p-9"><PageHeader eyebrow="New property" title="Add a property" description="Start with the essentials. You can add units next."/><PropertyForm/></div>}
