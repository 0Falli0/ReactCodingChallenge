import React from "react"
import { ActionIcon } from '@mantine/core';
import { IconListDetails } from '@tabler/icons-react';
import "./Components.css"

export default function DetailsButton() {
    return(
        <button className="detailsBtn">
            <ActionIcon size="xs">
                <IconListDetails/>
            </ActionIcon>
        </button>
    )
}