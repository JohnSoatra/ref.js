import ref, { ChangeEvent } from '../../../vref';

// const proxy1 = ref(new Set(), (evt) => {
//   console.log('change proxy1');
// });
// const proxy = ref(new Set(), (evt) => {
//   console.log('on change ', evt);
// });

// proxy.value.add.apply(proxy1.value, [1]);
// console.log(proxy.value);
const proxy = ref([1, 2, 3], (evt) => {
  console.log('on change', evt);
});
const a = proxy.value.with.call(proxy.value, 0, { name: 'sdf' } as any);
(a[0] as any).name = 'ss';
// console.log(Object.getPrototypeOf(new Proxy({}, {})));
// proxy.value.fill(1);
// proxy.value.add.apply(new Set([1]), [1])
// Object.defineProperty(proxy.value, 'test', {value: 34234 })

// console.log(proxy.value);
