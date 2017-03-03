// You should fork and save if you had updated this CodePend and want to send it to others.
// Note: antd.locales are only support by `dist/antd`
const { LocaleProvider, DatePicker, locales } = antd;
moment.locale('en');

ReactDOM.render(
  <LocaleProvider locale={locales.en_US}>
    <DatePicker defaultValue={moment()} />   
  </LocaleProvider>,
  mountNode
);

alert('123');