import { paginate } from './paginate';

export function searchObj(list, field, value) {
  if (typeof list[0][field] == 'string' ) {
    let searchList = list.filter( league =>
        league[field].toLowerCase() == value.toLowerCase() ||  league[field].toLowerCase().includes(value.toLowerCase())
   );
   return {
     searchList: searchList,
     searchPage: paginate(25, searchList),
   };
 }
 let searchList = list.filter( league =>
  league[field] == value
 );
 return {
   searchList: searchList,
   searchPage: paginate(25, searchList),
  };
}
