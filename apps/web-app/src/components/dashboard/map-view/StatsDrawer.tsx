import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import { Button } from "@chakra-ui/react";
import { CaretLeft } from "phosphor-react";
import type { TravelPreview } from "@/utils/types";
import DropdownCard from "./DropdownCard";
import ProgressCard from "./ProgressCard";

type StatsDrawerProps = {
  flyToBounds: (bounds: any) => void;
  fetchedTravels: TravelPreview[];
};

export default function StatsDrawer({ flyToBounds, fetchedTravels }: StatsDrawerProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dropdownRef = useRef<HTMLSelectElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // focus menu when open
  useEffect(() => {
    if (drawerOpen) {
      dropdownRef.current?.focus();
    } else {
      toggleRef.current?.focus();
    }
  }, [drawerOpen]);

  return (
    <div
      css={{
        position: "absolute",
        display: "flex",
        zIndex: "100",
        width: "350px",
        margin: "20px",
        gap: "20px",
        left: drawerOpen ? "0" : "-320px",
        transition: "left 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <aside
        aria-hidden={!drawerOpen}
        aria-label="Travel statistics"
        inert={!drawerOpen ? true : undefined}
        css={{ flexGrow: "1" }}
      >
        <DropdownCard flyToBounds={flyToBounds} dropdownRef={dropdownRef} />
        <ProgressCard fetchedTravels={fetchedTravels} />
      </aside>
      <Button
        ref={toggleRef}
        size="sm"
        colorPalette="gray"
        variant="surface"
        rounded="xl"
        aria-label={drawerOpen ? "Close stats menu" : "Open stats menu"}
        aria-expanded={drawerOpen}
        aria-controls="stats-drawer"
        onClick={() => setDrawerOpen(prev => !prev)}
        css={{
          display: "flex",
          flexDirection: "column",
          height: "fit-content",
          padding: "10px 5px",
        }}
      >
        <CaretLeft
          size={32}
          css={{
            transform: drawerOpen ? "rotate(0deg)" : "rotate(180deg)",
            transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
        <span css={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}>Stats Menu</span>
      </Button>
    </div>
  );
}
