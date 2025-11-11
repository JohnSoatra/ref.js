import ref, { ChangeEvent } from '../../../vref';

const proxy = ref([{name: 'nano'}], (evt) => {
  console.log('on change ', evt);
})

proxy.value.push({name: 'sdf'  });
Object.defineProperty(proxy.value, 'test', {value: 34234 })

console.log(proxy.value);
