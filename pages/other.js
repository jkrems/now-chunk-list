import {useEffect} from 'react';

export default () => {
  useEffect(() => {
    import('../lib/helpers-other').then(console.log);
  });
  return <div>Some Content</div>
}
