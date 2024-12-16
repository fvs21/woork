import BalloonSVG from "@/Components/SVGs/JobCategories/Balloon";
import BricksSVG from "@/Components/SVGs/JobCategories/Bricks";
import CouchSVG from "@/Components/SVGs/JobCategories/Couch";
import DoorSVG from "@/Components/SVGs/JobCategories/Door";
import DropSVG from "@/Components/SVGs/JobCategories/Drop";
import Electrical from "@/Components/SVGs/JobCategories/Electrical";
import Hammer from "@/Components/SVGs/JobCategories/Hammer";
import House from "@/Components/SVGs/JobCategories/House";
import PaintSVG from "@/Components/SVGs/JobCategories/Paint";
import Pet from "@/Components/SVGs/JobCategories/Pet";
import Plant from "@/Components/SVGs/JobCategories/Plant";
import Plumbery from "@/Components/SVGs/JobCategories/Plumbery";
import Screwdriver from "@/Components/SVGs/JobCategories/Screwdriver";
import Vehicle from "@/Components/SVGs/JobCategories/Vehicle";
import WaterSVG from "@/Components/SVGs/JobCategories/Water";

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

const width = "22px";

export const CategoriesList = [
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