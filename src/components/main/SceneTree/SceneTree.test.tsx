import React from "react";
import { render, screen } from "@testing-library/react";
import SceneTree from "./SceneTree";
import { getMockObject } from "../../../tests/utils";
import "@testing-library/jest-dom";

describe("SceneTree", () => {
  const objects = [
    {
      ...getMockObject(),
      id: "1",
      name: "Object 1",
    },
    {
      ...getMockObject(),
      id: "2",
      name: "Object 2",
    },
  ];
  const mockOnSetSelectedObjectId = jest.fn();
  const mockSelectedObjectId = "1";

  it("renders the SceneTree component", () => {
    render(
      <SceneTree
        objects={objects}
        selectedObjectId={mockSelectedObjectId}
        onSetSelectedObjectId={mockOnSetSelectedObjectId}
      />,
    );

    expect(screen.getByText("SCENE TREE")).toBeInTheDocument();
    expect(screen.getByText("2 objects")).toBeInTheDocument();
    expect(screen.getByText("cube: Object 1")).toBeInTheDocument();
    expect(screen.getByText("cube: Object 2")).toBeInTheDocument();
  });
});
