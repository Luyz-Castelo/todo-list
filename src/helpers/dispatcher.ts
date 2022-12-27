const createDispatcher = () => {
  const callbackLists: { [key: string]: Function[] } = {};

  const dispatch = (eventName: string, data: any) => {
    let callbackList = callbackLists[eventName];
    if (!callbackList) return;

    for (const callback of callbackList) {
      callback(data)
    }
  };
  
  const listen = (eventName: string, callback: Function) => {
    if (!callbackLists[eventName]) {
      callbackLists[eventName] = []
    }
    callbackLists[eventName].push(callback)
  };

  return {
    dispatch: dispatch,
    listen: listen,
  }
}

export const dispatcher = createDispatcher();
