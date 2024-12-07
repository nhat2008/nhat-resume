// utils.ts
export interface Company {
    frontmatter: {
      company: string;
      from_to: string;
      logo: string;
      title: string;
      link?: string;
    };
    compiledContent: () => string;
  }
export async function getCompanies(): Promise<Company[]> {
    const companies = Object.values(await import.meta.glob('../content/company/*.md', { eager: true })) as Company[];
  
    // Month order to compare months
    const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
    // Sort the companies by the start date (month and year) in descending order
    return companies.sort((a, b) => {
      // Extract the start date (month and year) from 'from_to'
      const startDateA = a.frontmatter.from_to.split(' - ')[0];
      const startDateB = b.frontmatter.from_to.split(' - ')[0];
  
      // Extract the month and year from the start date
      const [monthA, yearA] = startDateA.split(' ');
      const [monthB, yearB] = startDateB.split(' ');
  
      // Compare years first (in descending order)
      if (yearA !== yearB) {
        return parseInt(yearB) - parseInt(yearA); // Sort by year descending
      }
  
      // If years are equal, compare months (in descending order)
      return monthOrder.indexOf(monthB) - monthOrder.indexOf(monthA); // Sort by month descending
    });
  }
    