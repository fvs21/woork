import BalloonSVG from "@/components/SVGs/JobCategories/Balloon";
import BricksSVG from "@/components/SVGs/JobCategories/Bricks";
import CouchSVG from "@/components/SVGs/JobCategories/Couch";
import DoorSVG from "@/components/SVGs/JobCategories/Door";
import DropSVG from "@/components/SVGs/JobCategories/Drop";
import Electrical from "@/components/SVGs/JobCategories/Electrical";
import Hammer from "@/components/SVGs/JobCategories/Hammer";
import House from "@/components/SVGs/JobCategories/House";
import PaintSVG from "@/components/SVGs/JobCategories/Paint";
import Pet from "@/components/SVGs/JobCategories/Pet";
import Plant from "@/components/SVGs/JobCategories/Plant";
import Plumbery from "@/components/SVGs/JobCategories/Plumbery";
import Screwdriver from "@/components/SVGs/JobCategories/Screwdriver";
import Vehicle from "@/components/SVGs/JobCategories/Vehicle";
import WaterSVG from "@/components/SVGs/JobCategories/Water";
import React from "react";

export const Categories = {
    "Jardinería": "8DV7AS",
    "Plomería": "4B2MK6",
    "Electricidad": "1P0HBC",
    "Mascotas": "2HZ3PL",
    "Hogar": "G6S7JK",
    "Vehículos": "0PJD4M",
    "Carpintería": "M6BZK0",
    "Albañilería": "R2ZLKA",
    "Albercas": "8NASND",
    "Cancelería": "KM0Q29",
    "Decoraciones": "P10CSA",
    "Pintura": "NBJD0S",
    "Impermeablizado": "3NMAZS",
    "Muebles": "JK89XS",
    "Instalación": "BHDUS3"
}

type Category = {
    name: string;
    tag: string;
    icon: React.MemoExoticComponent<({ width }: { width: number; }) => React.ReactNode>;
}

export const CategoriesList: Array<Category> = [
    {
        'name': 'Jardinería',
        'tag': '8DV7AS',
        'icon': Plant
    },
    {
        'name': 'Plomería',
        'tag': '4B2MK6',
        'icon': Plumbery
    },
    {
        'name': 'Electricidad',
        'tag': '1P0HBC',
        'icon': Electrical
    },
    {
        'name': 'Mascotas',
        'tag': '2HZ3PL',
        'icon': Pet
    },
    {
        'name': 'Hogar',
        'tag': 'G6S7JK' ,
        'icon': House
    },
    {
        'name': 'Vehículos',
        'tag': '0PJD4M',
        'icon': Vehicle
    },
    {
        'name': 'Carpintería',
        'tag': 'M6BZK0',
        'icon': Hammer
    },
    {
        'name': 'Albañilería',
        'tag': 'R2ZLKA',
        'icon': BricksSVG
    }, 
    {
        'name': 'Albercas',
        'tag': '8NASND',
        'icon': WaterSVG
    },
    {
        'name': 'Cancelería',
        'tag': 'KM0Q29',
        'icon': DoorSVG
    },
    {
        'name': 'Decoraciones',
        'tag': 'P10CSA',
        'icon': BalloonSVG
    },
    {
        'name': 'Pintura',
        'tag': 'NBJD0S',
        'icon': PaintSVG
    },
    {
        'name': 'Impermeablizado',
        'tag': '3NMAZS',
        'icon': DropSVG
    },
    {
        'name': 'Muebles',
        'tag': 'JK89XS',
        'icon': CouchSVG
    },
    {
        'name': 'Instalación',
        'tag': 'BHDUS3',
        'icon': Screwdriver
    }
]