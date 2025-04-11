import { renderHook, act } from "@testing-library/react";
import useScene, { SceneObjects, SNAPSHOT_STORAGE_LIMIT } from "./useScene";
import { getMockObject } from "../../../tests/utils";

describe("useScene", () => {
  describe("onSetObjects", () => {
    it("should update objects and take a snapshot", () => {
      const { result } = renderHook(() => useScene());
      const initialObjects: SceneObjects = {
        obj1: { ...getMockObject(), id: "obj1" },
      };
      const updatedObjects: SceneObjects = {
        ...initialObjects,
        obj2: { ...getMockObject(), id: "obj2" },
      };

      act(() => {
        result.current.onSetObjects(initialObjects);
      });

      act(() => {
        result.current.onSetObjects(updatedObjects);
      });

      expect(result.current.objects).toEqual(updatedObjects);
      expect(result.current.selectedObjectId).toBeNull();
      expect(result.current.snapshots.future).toEqual([]);
      expect(result.current.snapshots.past).toEqual([{}, initialObjects]);
    });

    it("should not take a snapshot if ignoreSnapshot is true", () => {
      const { result } = renderHook(() => useScene());
      const objects: SceneObjects = {
        obj1: getMockObject(),
      };

      act(() => {
        result.current.onSetObjects(objects, { ignoreSnapshot: true });
      });

      expect(result.current.objects).toEqual(objects);
      expect(result.current.selectedObjectId).toBeNull();
      expect(result.current.snapshots.future).toEqual([]);
      expect(result.current.snapshots.past).toEqual([]);
    });

    it("should not clear selectedObjectId if the id exists in objects", () => {
      const { result } = renderHook(() => useScene());
      const initialObjects: SceneObjects = {
        obj1: { ...getMockObject(), id: "obj1" },
      };
      const updatedObjects: SceneObjects = {
        ...initialObjects,
        obj2: { ...getMockObject(), id: "obj2" },
      };

      act(() => {
        result.current.onSetObjects(initialObjects);
        result.current.onSetSelectedObjectId("obj1");
      });

      act(() => {
        result.current.onSetObjects(updatedObjects);
      });

      expect(result.current.selectedObjectId).toEqual("obj1");
    });

    it("should clear selectedObjectId if the id doesn't exist in objects anymore", () => {
      const { result } = renderHook(() => useScene());
      const initialObjects: SceneObjects = {
        obj1: { ...getMockObject(), id: "obj1" },
      };
      const updatedObjects: SceneObjects = {
        obj2: { ...getMockObject(), id: "obj2" },
      };

      act(() => {
        result.current.onSetObjects(initialObjects);
        result.current.onSetSelectedObjectId("obj1");
      });

      act(() => {
        result.current.onSetObjects(updatedObjects);
      });

      expect(result.current.selectedObjectId).toEqual(null);
    });
  });

  describe("onUndo", () => {
    it("should revert to the last snapshot", () => {
      const { result } = renderHook(() => useScene());
      const initialObjects: SceneObjects = {
        obj1: { ...getMockObject(), id: "obj1" },
      };
      const updatedObjects: SceneObjects = {
        ...initialObjects,
        obj2: { ...getMockObject(), id: "obj2" },
      };

      act(() => {
        result.current.onSetObjects(initialObjects);
      });

      act(() => {
        result.current.onSetObjects(updatedObjects);
      });

      act(() => {
        result.current.onUndo();
      });

      expect(result.current.objects).toEqual(initialObjects);
    });

    it("should do nothing if there are no past snapshots", () => {
      const { result } = renderHook(() => useScene());

      act(() => {
        result.current.onUndo();
      });

      expect(result.current.objects).toEqual({});
    });

    it("should delete future histories if they're larger than the limit", () => {
      const { result } = renderHook(() => useScene());
      result.current.snapshots.past = [{ obj0: { ...getMockObject(), id: "obj0" } }];
      result.current.snapshots.future = Array.from({ length: SNAPSHOT_STORAGE_LIMIT + 5 }, (_, i) => ({
        [`obj${String(i + 2)}`]: { ...getMockObject(), id: `obj${String(i + 2)}` },
      }));

      act(() => {
        result.current.onSetObjects({ obj1: { ...getMockObject(), id: "obj1" } }, { ignoreSnapshot: true });
      })

      act(() => {
        result.current.onUndo();
      });

      expect(Object.keys(result.current.objects)).toEqual(["obj0"]);
      expect(result.current.snapshots.past).toEqual([]);
      expect(result.current.snapshots.future.map(snap => Object.keys(snap)).flat()).toEqual(
        [
          "obj1",
          ...Array.from({ length: SNAPSHOT_STORAGE_LIMIT - 1 }, (_, i) => (
            `obj${String(i + 2)}`
          ))]
      );
    });
  });

  describe("onRedo", () => {
    it("should redo the last undone snapshot", () => {
      const { result } = renderHook(() => useScene());
      const initialObjects: SceneObjects = {
        obj1: { ...getMockObject(), id: "obj1" },
      };
      const updatedObjects: SceneObjects = {
        ...initialObjects,
        obj2: { ...getMockObject(), id: "obj2" },
      };

      act(() => {
        result.current.onSetObjects(initialObjects);
      })

      act(() => {
        result.current.onSetObjects(updatedObjects);
      });

      act(() => {
        result.current.onUndo();
      });

      act(() => {
        result.current.onRedo();
      });

      expect(result.current.objects).toEqual(updatedObjects);
    });

    it("should do nothing if there are no future snapshots", () => {
      const { result } = renderHook(() => useScene());

      act(() => {
        result.current.onRedo();
      });

      expect(result.current.objects).toEqual({});
    });

    it("should delete past histories if they're larger than the limit", () => {
      const { result } = renderHook(() => useScene());
      result.current.snapshots.future = [{ obj0: { ...getMockObject(), id: "obj0" } }];
      result.current.snapshots.past = Array.from({ length: SNAPSHOT_STORAGE_LIMIT + 5 }, (_, i) => ({
        [`obj${String(i + 2)}`]: { ...getMockObject(), id: `obj${String(i + 2)}` },
      })).reverse();

      act(() => {
        result.current.onSetObjects({ obj1: { ...getMockObject(), id: "obj1" } }, { ignoreSnapshot: true });
      });

      act(() => {
        result.current.onRedo();
      });

      expect(Object.keys(result.current.objects)).toEqual(["obj0"]);
      expect(result.current.snapshots.future).toEqual([]);
      expect(result.current.snapshots.past.map(snap => Object.keys(snap)).flat()).toEqual(
        [
          ...Array.from({ length: SNAPSHOT_STORAGE_LIMIT - 1 }, (_, i) => (
            `obj${String(i + 2)}`
          )).reverse(),
          "obj1",
        ]
      );
    });
  });
});