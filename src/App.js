import React, { useState } from 'react';

function App() {
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [isMobileMessageVisible, setIsMobileMessageVisible] = useState(false);

  const requestAllContactsPermission = async () => {
    if (isMobileBrowser()) {
      try {
        const contacts = await navigator.contacts.select(
          ['name', 'phoneNumbers'],
          { multiple: true }
        );
        setSelectedContacts(contacts);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    } else {
      setIsMobileMessageVisible(true);
    }
  };

  const isMobileBrowser = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };

  return (
    <div>
      <h1>Phone Book App</h1>
      <button onClick={requestAllContactsPermission}>Fetch All Contacts</button>
      {isMobileMessageVisible && (
        <p>Please open this app in a mobile browser to access contacts.</p>
      )}
      <ul>
        {selectedContacts.map((contact, index) => (
          <li key={index}>
            <strong>Name:</strong> {contact.name}{' '}
            {contact.phoneNumbers &&
              contact.phoneNumbers.map((phoneNumber, idx) => (
                <div key={idx}>
                  <strong>Phone {idx + 1}:</strong> {phoneNumber.number}
                </div>
              ))}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
