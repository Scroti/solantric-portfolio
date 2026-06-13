export const PROJECTS_QUERY = `*[_type == "project"] | order(order asc, _createdAt desc){
  "slug": slug.current,
  title,
  descRo,
  descEn,
  tags,
  link,
  accent,
  featured,
  "imageUrl": image.asset->url
}`

export const TESTIMONIALS_QUERY = `*[_type == "testimonial" && published == true] | order(order asc, _createdAt desc){
  quoteRo,
  quoteEn,
  name,
  roleRo,
  roleEn
}`
