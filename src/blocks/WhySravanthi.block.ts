import type { Block } from "payload"

export const WhySravanthiBlock: Block = {
  slug: "why-sravanthi",
  labels: { singular: "Why Sravanthi Section", plural: "Why Sravanthi Sections" },
  fields: [
    { name: "sectionTitle", type: "text", defaultValue: "Why Sravanthi" },
    { name: "subtitle", type: "text", defaultValue: "What makes every event special." },
    {
      name: "items",
      type: "array",
      fields: [
        { name: "title", type: "text" },
        { name: "description", type: "textarea" },
        { name: "iconName", type: "text", admin: { description: "Lucide icon name (e.g. ClipboardList, Heart, Globe)" } },
      ],
      defaultValue: [
        { title: "Personalized Preparation", description: "Every event is different. Sravanthi personally prepares for each one — understanding the audience, the tone, and the goals.", iconName: "ClipboardList" },
        { title: "Genuine Charisma", description: "A natural warmth and energy that connects with audiences instantly.", iconName: "Heart" },
        { title: "Multilingual — Telugu, Hindi & English", description: "Fluent in English, Telugu, and Hindi, and conversational in Tamil — seamlessly switching between languages to connect with diverse audiences.", iconName: "Globe" },
        { title: "Plans Games & Activities", description: "Not just hosting — plans and leads interactive games, icebreakers, and activities that keep the energy high.", iconName: "Gamepad2" },
        { title: "Weddings to Corporate Stages", description: "From Sangeets and Sweet 16s to corporate galas and celebrity interviews — the right energy for every occasion.", iconName: "Mic" },
        { title: "Memorable Moments", description: "Every event deserves moments that people talk about long after. Spontaneity, humour, and heart.", iconName: "Sparkles" },
      ],
    },
  ],
}
