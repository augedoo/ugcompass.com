import './CategoriesSection.css';
import React from 'react';
import { Link } from 'react-router-dom';

const CategoriesSection = () => {
  const categories = [
    {
      type: 'All Facilities',
      description: 'Take a look at all facilities available on campus',
    },
    {
      type: 'Study',
      link: 'study',
      description:
        'Study rooms, Open stack reading rooms, Library processing rooms.',
    },
    {
      type: 'Classrooms',
      link: 'classroom',
      description:
        'General purpose classrooms, lecture halls, recitation rooms, and other rooms used primarily for scheduled non-labouratory instruction.',
    },
    {
      type: 'Offices',
      link: 'office',
      description:
        'Offices and conference rooms specifically assigned to each of the various academic, adminstrative and service functions.',
    },
    {
      type: 'General Use',
      link: 'general_use',
      description:
        'Campus general service or functional support system (assembly, exhibition, dining, relaxation, merchandising, recreating, general meetings and day care).',
    },
    {
      type: 'Labouratories',
      link: 'laboratory',
      description:
        'Rooms characterized by special purpose, equipment or a specific configuration that ties instructional or research activities to a particular discipline or closely related group of disciplines.',
    },
    {
      type: 'Residential',
      link: 'residential',
      description:
        'Housing facilities for students, faculty, staff and outside visitors to campus.',
    },
    {
      type: 'Special Use',
      link: 'special_use',
      description:
        'Areas sufficiently specialized in their primary activity or function. Places for atlethics, media production, clinical (outside seperately organized healthcare facilities), demonstration, agricultural fieldss, and animal and plant shelters',
    },
    {
      type: 'Leased',
      link: 'leased',
      description: 'All facilities University of Ghana leases',
    },
    {
      type: 'Support',
      link: 'support',
      description:
        'These facilities provide centralized space for auxiliary support systems, which help keep all institutional programs and activities operational. Included in these areas are computer-based processing and telecommunications, shop services, general storage and supply, vehicle storage, central services (e.g. printing and duplicating, mail, shipping and receiving, environmental testing or monitoring, laundry,or food supplies), and hazardous materials areas.',
    },
    {
      type: 'Others',
      link: 'other',
      description:
        ' Includes health care facilities (rooms used to provide patient care that is located in separately organized health care facilities),unclassified areas (assignable areas that are inactive or unassigned; in the process of being altered, renovated, or converted), and nonassignable areas (areas of a building that are used to support the overall activities in that building - e.g., elevators, stairs, custodial closets, circulation, and mechanical areas).',
    },
  ];

  const renderedCategories = categories.map((category) => {
    return (
      <div key={category.type} className='item'>
        <sl-tooltip content={category.description}>
          <Link
            to={
              category.link
                ? `/facilities/categories/${category.link}`
                : '/facilities'
            }
          >
            <span>{category.type}</span>
            <div className='arrow-icon'>
              <svg
                className='w-6 h-6'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </div>
          </Link>
        </sl-tooltip>
      </div>
    );
  });

  return (
    <section className='categories'>
      <div className='categories__wrapper'>
        <div className='items'>{renderedCategories}</div>
      </div>
    </section>
  );
};

export default CategoriesSection;
