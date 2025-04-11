import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ObjectAttributes from "./ObjectAttributes";
import { getMockObject } from "../../../tests/utils";

describe("ObjectAttributes Component", () => {
  const objects = {
    obj1: {
      ...getMockObject(),
      id: "obj1",
      name: "Object 1",
      shape: "cube",
      position: [1, 2, 3] as [x: number, y: number, z: number],
    },
  };

  const mockOnSetObjects = jest.fn();

  it("renders the positions x, y, and z of the selected object", () => {
    render(
      <ObjectAttributes
        objects={objects}
        selectedObjectId="obj1"
        onSetObjects={mockOnSetObjects}
      />,
    );

    expect(screen.getByDisplayValue("1")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2")).toBeInTheDocument();
    expect(screen.getByDisplayValue("3")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Object 1")).toBeInTheDocument();
    expect(screen.getByText("Mesh: cube")).toBeInTheDocument();
  });

  it("does not render anything if object selected is not in objects", () => {
    const { container } = render(
      <ObjectAttributes
        objects={objects}
        selectedObjectId={"obj2"}
        onSetObjects={mockOnSetObjects}
      />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("does not render anything if no object is selected", () => {
    const { container } = render(
      <ObjectAttributes
        objects={objects}
        selectedObjectId={null}
        onSetObjects={mockOnSetObjects}
      />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("calls onSetObjects with the updated name when the name input is changed", async () => {
    render(
      <ObjectAttributes
        objects={objects}
        selectedObjectId="obj1"
        onSetObjects={mockOnSetObjects}
      />,
    );

    const nameInput = await screen.findByDisplayValue("Object 1");
    fireEvent.change(nameInput, { target: { value: "Updated Object 1" } });

    expect(mockOnSetObjects).toHaveBeenCalledWith({
      ...objects,
      obj1: {
        ...objects.obj1,
        name: "Updated Object 1",
      },
    });
  });
});
