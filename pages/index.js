import {useEffect} from 'react';

export default () => {
  useEffect(() => {
    import('../lib/helpers-index').then(console.log);
  });
  return <div>Some Content</div>
}
