## Code review (~20m)

Passez en revue le code ci dessous

Si vous pensez que des modifications sont utiles
1. écrivez un commentaire comme pendant une review de pull request
2. puis écrivez le code comme vous l'imagineriez

**NB**

- Faites ces reviews comme bon vous semble, tout n'est pas à commenter
- Ne commentez pas le style (indentation, trailing comma, etc.)
- Admettez que le code fonctionne
- Ces bouts de codes fictifs n'ont rien à voir les uns avec les autres
- Ne vous attardez pas sur des détails, comme le naming, qui ne nous intéressent pas ici

1.

```js
const data = [
  { value: "1", label: "One" },
  { value: "2", label: "Two" },
  { value: "3", label: "Three" },
];

// essayer d'ecrire le code en ES6.
/*
const data = [
  { value: "1", label: "One" },
  { value: "2", label: "Two" },
  { value: "3", label: "Three" },
];
const values = data.reduce((ac, { value }) => [...ac, value], []);
*/
const values = data.reduce((values, { value }) => {
  values.push(value);
  return values;
}, []);
```

2.

```js
// ES6 the same, making await into the return of async function not really necessary.
/*
const getIndexes = async () => fetch('https://api.coingecko.com/api/v3/indexes').then(res => res.json())
*/
async function getIndexes() {
   return await fetch('https://api.coingecko.com/api/v3/indexes').then(res => res.json());
}

/*
const  analyzeIndexes = async () => getIndexes().catch(_ => { throw new Error('Unable to fetch indexes'); });
*/
async function analyzeIndexes() {
   const indexes = await getIndexes().catch(_ => {
      throw new Error('Unable to fetch indexes');
   });
   return indexes;
}
```

3.

```js
let state;
const user = getUser();
if (user) {
   const project = getProject(user.id);
   state = {
      user,
      project
   };
} else {
   state = {
      user: null,
      project: null
   };
}
ctx.body = state;
```

4.

```js
function getQueryProvider() {
  const url = window.location.href;
  const [_, provider] = url.match(/provider=([^&]*)/);
  if (provider) {
     return provider;
  }
  return;
}
```

5.

```js
function getParagraphTexts() {
   const texts = [];
   document.querySelectorAll("p").forEach(p => {
      texts.push(p);
   });
   return texts;
}
```

6.

```js
function Employee({ id }) {
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(true);
   const [employee, setEmployee] = useState({});

   useEffect(() => {
      getEmployee(id)
         .then(employee => {
            setEmployee(employee);
            setLoading(false);
         })
         .catch(_ => {
            setError('Unable to fetch employee');
            setLoading(false);
         });
   }, [id]);

   if (error) {
      return <Error />;
   }

   if (loading) {
      return <Loading />;
   }

   return (
      <Table>
         <Row>
            <Cell>{employee.firstName}</Cell>
            <Cell>{employee.lastName}</Cell>
            <Cell>{employee.position}</Cell>
            <Cell>{employee.project}</Cell>
            <Cell>{employee.salary}</Cell>
            <Cell>{employee.yearHired}</Cell>
            <Cell>{employee.wololo}</Cell>
         </Row>
      </Table>
   );
}
```

7.

```js
async function getFilledIndexes() {
   try {
      const filledIndexes = [];
      const indexes = await getIndexes();
      const status = await getStatus();
      const usersId = await getUsersId();

      for (let index of indexes) {
         if (index.status === status.filled && usersId.includes(index.userId)) {
            filledIndexes.push(index);
         }
      }
      return filledIndexes;
   } catch(_) {
      throw new Error ('Unable to get indexes');
   }
}
```

8.

```js
function getUserSettings(user) {
   if (user) {
      const project = getProject(user.id);
      if (project) {
         const settings = getSettings(project.id);
         if (settings) {
            return settings;
         }
      }
   }
   return {};
}
```
