function gen() {
  const arr = process.argv[2].split('\n');
  console.log(
    arr
      .reduce((sum: any, cur, index) => {
        const m = cur.split(';');
        if (m.length == 1) sum.push(`.add({ en: '${m[0]}', alias: 't${index + 1}' })`);
        else {
          sum.push(`.add({ en: '${m[0]}', alias: 't${index + 1}in' })`);
          sum.push(`.add({ en: '${m[1]}', alias: 't${index + 1}out' })`);
        }
        return sum;
      }, [])
      .join('\n'),
  );
}
gen();
