interface State{
    slice1:string;
    slice2:string;
  }
  
  interface Reducer<T extends keyof State, A extends SliceMap<T>> {
  }
  
  class BaseReducer<T extends keyof State, A extends SliceMap<T>> implements Reducer<T,A> {
  }
  
  type ReducerCtor<T  extends keyof State> = { new() :Reducer<T, any> };
  
  class Action {
      readonly sliceMap = Reducer1.sliceMap;
  }
  let x = new Action();
  
  class Action2 {
      readonly sliceMap = {
        ...Reducer1.sliceMap,
        ...Reducer2.sliceMap
      };
      constructor() {
  
      }
  }
  
  class Reducer1 extends BaseReducer<"slice1", Action | Action2>  {
    static sliceMap = {
      "slice1" : Reducer1
    }
  }
  
  class Reducer2 extends BaseReducer<"slice2", Action2>  {
    static sliceMap = {
      "slice2" : Reducer2
    }
  }
  
  type SliceMap<E extends keyof State> = {
    sliceMap: {
      [D in E] : ReducerCtor<E>
    }
  };
  
  