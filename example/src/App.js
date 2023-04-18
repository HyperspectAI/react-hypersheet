import React from 'react';
import Table from 'react-hypersheet'

const fetchProspects = async () => {
  try {
    const endpoint = 'https://jsonplaceholder.typicode.com/users';
    const result = await fetch(endpoint, {
      method: 'GET'
    });
    return await result.json();
  }
  catch (err) {
    console.log(err);
  }
}

const getHeaders = (prospects) => {
  const arr = [];
  Object.keys(prospects[0]).map(k => arr.push({
    fieldName: k,
    headerName: k.toUpperCase(),
    isVisible : true,
  }));
  return arr;
}


function App() {
  const [prospects, setProspects] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const prospectsResult = await fetchProspects();
      setProspects(prospectsResult);
    })()
  }, [])

  if (!prospects.length) return null;
  return (
      <div>
      <Table
        headers={getHeaders(prospects)}
        rows={prospects}
        showPageHeader={true}
        showToolbar={true}
        docTitle={'My document'}
      />
    </div>
  );
}

export default App;
