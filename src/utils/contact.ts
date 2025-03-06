import _ from 'lodash';
import {Contact} from 'react-native-contacts/type';

// Function to sort and group contacts alphabetically
function organizeContacts(
  contacts: Contact[],
): {title: string; data: Contact[]}[] {
  // Sort contacts by displayName
  const sortedContacts = _.sortBy(contacts, contact =>
    contact.displayName.toLowerCase(),
  );

  // Group contacts by the first letter of displayName
  const groupedContacts = _.groupBy(sortedContacts, contact =>
    contact.displayName.charAt(0).toUpperCase(),
  );

  // Convert grouped object into an array of { title, data }
  const result = _.map(groupedContacts, (data, title) => ({
    title,
    data,
  }));

  // Sort the result by title (alphabetical order)
  return _.sortBy(result, 'title');
}

export {organizeContacts};
