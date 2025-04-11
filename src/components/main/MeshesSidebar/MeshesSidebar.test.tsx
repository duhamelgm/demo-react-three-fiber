import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MeshesSidebar from "./MeshesSidebar";
import { SceneObject } from "../Scene/useScene";
import { getMockObject } from "../../../tests/utils";

describe("MeshesSidebar", () => {
  const mockOnSetObjects = jest.fn();
  const mockOnSetSelectedObjectId = jest.fn();
  const objects = {
    obj1: {
      ...getMockObject(),
      id: "obj1",
      name: "Object 1",
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call onSetObjects and add a new cube object when the add button is clicked", () => {
    render(
      <MeshesSidebar
        onSetObjects={mockOnSetObjects}
        objects={objects}
        onSetSelectedObjectId={mockOnSetSelectedObjectId}
      />,
    );

    const addCubeButton = screen.getByText("Add Cube");
    fireEvent.click(addCubeButton);

    expect(mockOnSetObjects).toHaveBeenCalledTimes(1);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const newObjects = mockOnSetObjects.mock.calls[0][0] as SceneObject;
    const newObjectId = Object.keys(newObjects).find((id) => !(id in objects));

    expect(newObjectId).toBeDefined();
    if (newObjectId) {
      expect(newObjects[newObjectId]).toMatchObject({
        name: "cube",
        shape: "cube",
      });
    }

    expect(mockOnSetSelectedObjectId).toHaveBeenCalledWith(newObjectId);
  });
});
