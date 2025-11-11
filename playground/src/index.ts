import ref, { ChangeEvent } from '../../../vref';

const proxy = ref(new Set(), (evt) => {
  console.log('on change ', evt);
})

proxy.value.add.apply(new Set(), [1])
// proxy.value.fill(1);
// proxy.value.add.apply(new Set([1]), [1])
// Object.defineProperty(proxy.value, 'test', {value: 34234 })

// console.log(proxy.value);
