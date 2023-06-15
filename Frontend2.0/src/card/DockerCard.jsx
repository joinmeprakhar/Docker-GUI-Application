'use client';

import { Tabs } from 'flowbite-react';
import { HiAdjustments, HiClipboardList, HiOutlineDuplicate, HiTemplate, HiOutlineTrendingUp, HiOutlineFolderOpen } from 'react-icons/hi';
import { BiImages } from 'react-icons/bi';
import { MdDashboard } from 'react-icons/md';
import Logs from '../container/log/Logs';
import ManageImages from '../container/manage_images/ManageImages';


export default function DockerCard(props) {
    return (
        <Tabs.Group
            aria-label="Tabs with underline"
            style="underline"
            className='bg-gray-200'
        >
            <Tabs.Item
                active
                icon={HiOutlineDuplicate}
                title="Create Resources"
                className='bg-gray-200'

            >
                <div className='ml-10 mr-10 mb-7 '>

                    <a href='/createcontainer'>
                        <div className='transition-all duration-300 ease-in-out transform hover:shadow-lg hover:scale-105 bg-gray-100 pt-5 mt-3.5 mb-3 pb-5 rounded-lg shadow flex items-start gap-5 overflow-hidden'>
                            
                            <span className="relative flex h-2 w-2 mt-4 ml-10">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            <HiTemplate className='text-blue-900 h-7 w-7 mt-3.5' />
                            <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-3 ">Create Container</h2>
                            <p className="text-gray-700 mt-4">This service helps to launch the Docker container on the targeted Host with custom configuration</p>
                        </div>
                    </a>


                    <a href='/managenetwork'>
                        <div className='transition-all duration-300 ease-in-out transform hover:shadow-lg hover:scale-105 bg-gray-100 pt-5 mt-3.5 mb-3 pb-5 rounded-lg shadow flex items-start gap-5 overflow-hidden'>
                            <span className="relative flex h-2 w-2 mt-2.5 mt-4 ml-10">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                            </span>
                            <HiOutlineTrendingUp className='text-blue-900 h-7 w-7 mt-3.5'/>
                            <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-3">Create Network</h2>
                            <p className="text-gray-700 mt-4">We create a network to keep multiple containers in a common network so that containers have internal connectivity</p>
                        </div>
                    </a>
                    <a href='/managevolume'>
                        <div className='transition-all duration-300 ease-in-out transform hover:shadow-lg hover:scale-105 bg-gray-100 pt-5 mt-3.5 mb-3 pb-5 rounded-lg shadow flex items-start gap-5 overflow-hidden'>
                            <span className="relative flex h-2 w-2 mt-4 ml-10">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-700 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-800"></span>
                            </span>
                            <HiOutlineFolderOpen className='text-blue-900 h-7 w-7 mt-3.5' />
                            <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-3">Create Volume</h2>
                            <p className="text-gray-700 mt-4">Docker Volume helps to keep data persistent, even if the container is deleted, the data will be saved on the Docker volume on the target host</p>
                        </div>
                    </a>
                </div>


            </Tabs.Item>
            <Tabs.Item
                icon={MdDashboard}
                title="Manage Resources"
            >
                <div className='ml-10 mr-10 '>
                    <a href='/managecontainer'>
                        <div className='transition-all duration-300 ease-in-out transform hover:shadow-lg hover:scale-105 bg-gray-100 pt-5 mt-2.5 mb-2.5 pb-5 rounded-lg shadow flex items-center justify-center gap-12 overflow-hidden'>

                            <HiTemplate className='text-blue-900 h-7 w-7' />
                            <h2 className="text-2xl font-bold text-blue-900 mb-4 pt-3">Containers</h2>
                            <p className="text-gray-700">Start, Stop, Delete, Restart Container</p>
                        </div>
                    </a>
                    <a href='/managenetwork'>
                        <div className='transition-all duration-300 ease-in-out transform hover:shadow-lg hover:scale-105 bg-gray-100 pt-5 pb-5 mt-2.5 mb-2.5 rounded-lg shadow flex items-center justify-center gap-12 overflow-hidden'>
                            <HiOutlineTrendingUp className='text-blue-900 h-7 w-7' />
                            <h2 className="text-2xl font-bold text-blue-900 mb-4 pt-3">Networks</h2>
                            <p className="text-gray-700">Create Network, Delete Network</p>
                        </div>
                    </a>
                    <a href='/managevolume'>
                        <div className='transition-all duration-300 ease-in-out transform hover:shadow-lg hover:scale-105 bg-gray-100 rounded-lg mt-3 mb-3 pt-5 pb-5 shadow flex items-center justify-center gap-12 overflow-hidden'>
                            <HiOutlineFolderOpen className='text-blue-900 h-7 w-7' />
                            <h2 className="text-2xl font-bold text-blue-900 mb-4 pt-3">Volumes</h2>
                            <p className="text-gray-700">Create Volume, Delete Volume</p>
                        </div>
                    </a>
                </div>
            </Tabs.Item>
            <Tabs.Item
                icon={HiAdjustments}
                title="Container Logs"
            >
                <Logs apiurl={props.apiurl} />
            </Tabs.Item>
            <Tabs.Item
                icon={BiImages}
                title="Registry"
            >
                <ManageImages apiurl={props.apiurl} />

            </Tabs.Item>

        </Tabs.Group>
    )
}


