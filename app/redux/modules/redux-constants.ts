// import cycle problemi icin ortak bir
// map objesi olusturuyoruz ve ilgili action
// creator ve thunk fonksiyonlarini bu map
// icine kaydediyoruz. Bu sayede 2 reducer
// ts dosyasi birbirini import etmeden birbirlerine
// ait action creator veya thunk fonksiyonlari
// cagirabilir.
export const ReduxActions: any = {
  auth: {},
  global: {}
};
